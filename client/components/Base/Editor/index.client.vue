<script setup lang="ts">
  import TiptapUnderline from "@tiptap/extension-underline"
  import TiptapPlaceholder from "@tiptap/extension-placeholder"
  const initialValue = defineModel({ default: "" })

  const editor = useEditor({
    content: initialValue.value,
    extensions: [
      TiptapStarterKit,
      TiptapUnderline,
      TiptapPlaceholder.configure({
        placeholder: "Enter your content here"
      })
    ],
    editorProps: {
      attributes: {
        class:
          "wysiwyg p-3 h-50vh overflow-y-auto focus:outline-none bordered bg-accent/5 rounded-lg"
      }
    },
    onUpdate: () => {
      initialValue.value = editor.value?.getHTML() || ""
    }
  })
</script>

<template>
  <div>
    <div v-if="editor" flex="~ gap-2 wrap" mb="4">
      <BaseEditorBtn
        @click="editor.chain().focus().setParagraph().run()"
        :pressed="editor.isActive('paragraph')"
        icon="i-mingcute-paragraph-fill"
      />
      <BaseEditorBtn
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :pressed="editor.isActive('heading', { level: 1 })"
        icon="i-mingcute-heading-1-fill"
      />
      <BaseEditorBtn
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :pressed="editor.isActive('heading', { level: 2 })"
        icon="i-mingcute-heading-2-fill"
      />
      <BaseEditorBtn
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :pressed="editor.isActive('heading', { level: 3 })"
        icon="i-mingcute-heading-3-fill"
      />
      <BaseEditorBtn
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :pressed="editor.isActive('bold')"
        icon="i-mingcute-bold-fill"
      />
      <BaseEditorBtn
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :pressed="editor.isActive('italic')"
        icon="i-mingcute-italic-fill"
      />
      <BaseEditorBtn
        @click="editor.chain().focus().toggleUnderline().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :pressed="editor.isActive('underline')"
        icon="i-mingcute-underline-fill"
      />
      <BaseEditorBtn
        @click="editor.chain().focus().toggleBulletList().run()"
        :disabled="!editor.can().chain().focus().toggleBulletList().run()"
        :pressed="editor.isActive('bulletList')"
        icon="i-mingcute-list-check-fill"
      />
      <BaseEditorBtn
        @click="editor.chain().focus().toggleOrderedList().run()"
        :disabled="!editor.can().chain().focus().toggleOrderedList().run()"
        :pressed="editor.isActive('orderedList')"
        icon="i-mingcute-list-ordered-fill"
      />
      <BaseEditorBtn
        @click="editor.chain().focus().toggleBlockquote().run()"
        :disabled="!editor.can().chain().focus().toggleBlockquote().run()"
        :pressed="editor.isActive('blockquote')"
        icon="i-mingcute-quote-right-fill"
      />
      <BaseEditorBtn
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
        :pressed="editor.isActive('blockquote')"
        icon="i-mingcute-back-2-fill"
      />
      <BaseEditorBtn
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
        :pressed="editor.isActive('blockquote')"
        icon="i-mingcute-forward-2-fill"
      />
    </div>
    <TiptapEditorContent class="w-full" :editor="editor" />
  </div>
</template>

<style lang="css">
  .tiptap p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
</style>
