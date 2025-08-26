<script lang="ts" setup>
const slug = useRoute("news-slug").params.slug
const { data: news, error } = await useFetch<INews>(`/api/news/single?slug=${encodeURIComponent(String(slug))}`)

useHead({
  title: computed(() => (news.value?.title ? `${news.value.title} — News` : 'News'))
})

function isSafeUrl(url?: string | null) {
  if (!url) return false
  try {
    const base = (typeof location !== 'undefined' && location.origin) ? location.origin : 'http://localhost'
    const u = new URL(url, base)
    return ['http:', 'https:', 'mailto:', 'data:'].includes(u.protocol)
  } catch {
    return false
  }
}

function simpleSanitize(dirty?: string | null) {
  if (!dirty) return ''
  if (typeof DOMParser === 'undefined') {
    return String(dirty)
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
      .replace(/\son\w+="[^"]*"/gi, '')
      .replace(/\son\w+='[^']*'/gi, '')
      .replace(/href=["']\s*javascript:[^"']*["']/gi, 'href="#"')
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(dirty, 'text/html')
  doc.querySelectorAll('script, iframe, object, embed, form').forEach(n => n.remove())

  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT)
  let node: Element | null = walker.nextNode() as Element | null
  while (node) {
    for (const attr of Array.from(node.attributes)) {
      const name = attr.name.toLowerCase()
      const val = attr.value
      if (name.startsWith('on') || /javascript:/i.test(val)) {
        node.removeAttribute(attr.name)
        continue
      }
      if ((name === 'href' || name === 'src')) {
        if (!isSafeUrl(val)) {
          node.removeAttribute(attr.name)
        } else {
          if (name === 'href') {
            node.setAttribute('target', '_blank')
            node.setAttribute('rel', 'noopener noreferrer')
          }
          if (name === 'src' && node.tagName.toLowerCase() === 'img') {
            node.setAttribute('loading', 'lazy')
          }
        }
      }
    }
    node = walker.nextNode() as Element | null
  }

  return doc.body.innerHTML
}

const sanitizedContent = computed(() => simpleSanitize(news.value?.content || ''))

const isoDate = computed(() => {
  if (!news.value?.createdAt) return ''
  const d = new Date(news.value.createdAt)
  return isNaN(d.getTime()) ? '' : d.toISOString()
})

const formattedDate = computed(() => {
  if (!news.value?.createdAt) return ''
  const d = new Date(news.value.createdAt)
  return isNaN(d.getTime()) ? String(news.value.createdAt) : d.toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
})

const readingTime = computed(() => {
  let text = ''
  if (typeof document !== 'undefined') {
    const tmp = document.createElement('div')
    tmp.innerHTML = sanitizedContent.value
    text = tmp.textContent || ''
  } else {
    text = sanitizedContent.value.replace(/<[^>]*>/g, ' ')
  }
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
})

const placeholderImg = ref('')
function onImgError(e: Event) {
  const t = e.target as HTMLImageElement
  if (!placeholderImg.value) {
    placeholderImg.value =
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'><rect fill='#f3f4f6' width='800' height='450'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-family='Arial,Helvetica,sans-serif' font-size='20'>Image unavailable</text></svg>`
      )
  }
  t.src = placeholderImg.value
}
</script>

<template>
  <main class="container">
    <div v-if="error" class="status error">
      <h2>Something went wrong</h2>
      <p>{{ error.message || 'Unable to load the article.' }}</p>
    </div>

    <div v-else-if="!news || !news.title" class="status loading">
      <p>Loading article…</p>
    </div>

    <article v-else class="news-article" aria-labelledby="article-title">
      <header class="hero">
        <h1 id="article-title" class="title">{{ news.title }}</h1>
        <h2 v-if="news.summary" class="subtitle">{{ news.summary }}</h2>
        <time v-if="news.createdAt" class="meta-time" :datetime="isoDate">{{ formattedDate }}</time>
      </header>

      <figure v-if="news.imgUrl" class="hero-figure">
        <img
          :src="news.imgUrl"
          :alt="news.title || 'article image'"
          class="hero-img"
          loading="lazy"
          @error="onImgError"
        />
        <figcaption v-if="news.summary" class="figcaption">{{ news.summary }}</figcaption>
      </figure>

      <section class="prose" v-html="sanitizedContent"></section>

      <footer class="post-footer" aria-label="Post meta">
        <div class="post-meta">
          <span>Published <time :datetime="isoDate">{{ formattedDate }}</time></span>
          <span class="dot">•</span>
          <span>{{ readingTime }} min read</span>
        </div>
      </footer>
    </article>
  </main>
</template>

<style scoped>
:root{
  --bg: #ffffff;
  --text: #111827;
  --muted: #6b7280;
  --accent: #139B48;
  --card: #f9fafb;
  --border: #e5e7eb;
}

.container { padding: 1rem; max-width: 88ch; margin: 1.25rem auto; }

.status { padding: 2rem; border-radius: 0.5rem; background: #fff; text-align: center; color: var(--muted); }
.status.error { border: 1px solid rgba(220,20,60,0.08); color: #9a1a1a; }

.news-article { font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; color: var(--text); margin: 0 auto; padding: 1.25rem; }

.hero { margin-bottom: 1rem; }

.title { font-size: 1.6rem; line-height: 1.18; font-weight: 800; margin: 0 0 0.35rem 0; letter-spacing: -0.01em; color: var(--text); }

.subtitle { font-size: 0.98rem; color: var(--muted); font-weight: 400; margin: 0 0 0.5rem 0; font-style: italic; }

.meta-time { display: block; font-size: 0.9rem; color: var(--muted); margin-top: 0.4rem; }

.hero-figure { margin: 1rem 0; text-align: center; }
.hero-img { display: block; width: 100%; max-height: 36rem; object-fit: cover; border-radius: 0.65rem; box-shadow: 0 8px 28px rgba(16,24,40,0.06); transition: transform 220ms ease, box-shadow 220ms ease; }
.hero-img:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(16,24,40,0.09); }
.figcaption { font-size: 0.92rem; color: var(--muted); margin-top: 0.6rem; text-align: center; }

.prose { margin-top: 1rem; color: #374151; line-height: 1.95; font-size: 1rem; text-align: justify; text-justify: inter-word; hyphens: auto; }

/* Keep headings, figures and code left-aligned for readability */
.prose h1, .prose h2, .prose h3, .prose h4,
.prose figure, .prose pre, .prose blockquote, .prose table {
  text-align: left;
}

.prose p, .prose li {
  margin-bottom: 1rem;
}

/* Headings inside content */
.prose h1, .prose h2, .prose h3, .prose h4 { color: var(--text); margin-top: 1.4rem; margin-bottom: 0.6rem; line-height: 1.25; }
.prose h1 { font-size: 1.8rem; }
.prose h2 { font-size: 1.35rem; }
.prose h3 { font-size: 1.15rem; }

.prose a { color: var(--accent); text-decoration: none; border-bottom: 1px solid rgba(37,99,235,0.12); transition: color .18s, border-color .18s; }
.prose a:hover { color: #1e40af; border-color: rgba(30,64,175,0.18); }

.prose blockquote { border-left: 4px solid var(--accent); background: var(--card); padding: 0.9rem 1.2rem; margin: 1rem 0; border-radius: 0.5rem; color: #374151; font-style: italic; }

.prose ul, .prose ol { margin: 0.75rem 0 0.75rem 1.25rem; }

.post-footer { margin-top: 1.25rem; border-top: 1px solid var(--border); padding-top: 1rem; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.75rem; align-items: center; }
.post-meta { color: var(--muted); font-size: 0.95rem; display: flex; gap: 0.45rem; align-items: center; }
.post-meta .dot { opacity: 0.5; margin: 0 6px; }

@media (max-width: 720px) {
  .container { padding: 1rem; margin: 0.75rem; }
  .title { font-size: 1.4rem; }
  .subtitle { font-size: 0.95rem; }
  .hero-img { max-height: 22rem; }
  .prose { font-size: 0.98rem; line-height: 1.65; }
  .post-footer { flex-direction: column; align-items: flex-start; gap: .5rem; }
}
</style>
