export const useFormSchemas = () => {
  const AccountInfo = [
    {
      $formkit: "text",
      label: "Surname",
      name: "surname",
      placeholder: "Enter staff's surname here",
      validation: "required"
    },
    {
      $formkit: "text",
      label: "Firstname",
      name: "firstname",
      placeholder: "Enter staff's firstname here",
      validation: "required"
    },
    {
      $formkit: "text",
      label: "Lastname",
      name: "lastname",
      placeholder: "Enter staff's firstname here",
      help: "This is an optional but useful field"
    },
    {
      $formkit: "email",
      label: "Email Address",
      name: "email",
      placeholder: "Enter staff's email address here",
      validation: "required|email"
    },
    {
      $formkit: "tel",
      label: "Phone No.",
      name: "phoneNumber",
      placeholder: "Enter staff's phone number here",
      validation: "length:11"
    },
    {
      $formkit: "select",
      label: "Staff Role",
      name: "role",
      placeholder: "Select role for staff",
      validation: "required",
      options: ["Staff", "Admin"]
    }
  ]

  const ScreeningInfo = [
    {
      $formkit: "text",
      label: "Title",
      name: "title",
      placeholder: "Enter verification title here",
      validation: "required"
    },
    {
      $formkit: "text",
      label: "Description",
      name: "description",
      placeholder: "Enter verification description here",
      help: "This is optional but useful"
    },
    {
      $formkit: "tags",
      label: "Requirements",
      name: "requirements",
      placeholder: "Enter requirements for verification here",
      validation: "required"
    },
    {
      $formkit: "date",
      label: "Deadline",
      name: "deadline",
      placeholder: "Select verification deadline",
      validation: "required|date_after"
    }
  ]

  const RecruitmentInfo = [
    {
      $formkit: "text",
      label: "Job Title",
      name: "jobTitle",
      placeholder: "Enter job title here",
      validation: "required"
    },
    {
      $formkit: "tags",
      label: "Requirements",
      name: "requirements",
      placeholder: "Enter requirements for job here",
      validation: "required"
    },
    {
      $formkit: "date",
      label: "Deadline",
      name: "deadline",
      placeholder: "Select job deadline",
      validation: "required|date_after"
    }
  ]

  const RecruitmentApplication = [
    {
      $formkit: "tags",
      label: "Requirements",
      name: "requirements",
      placeholder: "Enter requirements for job here",
      validation: "required"
    },
    {
      $formkit: "date",
      label: "Deadline",
      name: "deadline",
      placeholder: "Select job deadline",
      validation: "required|date_after"
    }
  ]

  const PostingSchema = (opts?: any) => {
    const staffSchema = (o: any) => ({
      $formkit: "cselect",
      label: "Select Staff",
      name: "staffId",
      placeholder: "Select a staff to post/transfer",
      options: [...o],
      validation: "required"
    })

    const schema = [
      {
        $formkit: "text",
        label: "LGEA",
        name: "lga",
        placeholder: "Enter the local government education authority here",
        validation: "required"
      },
      {
        $formkit: "text",
        label: "Position",
        name: "position",
        placeholder: "Enter the post for the staff",
        validation: "required"
      },
      {
        $formkit: "text",
        label: "Department",
        name: "department",
        placeholder: "Enter the department for the staff",
        help: "This is optional"
      },
      {
        $formkit: "text",
        label: "Course",
        name: "course",
        placeholder: "Enter the course for the staff",
        help: "This is optional"
      },
      {
        $formkit: "text",
        label: "School/Ministry/Board",
        name: "institute",
        placeholder: "Enter the school/ministry/board name for the staff",
        validation: "required"
      }
    ]

    return opts ? [staffSchema(opts), ...schema] : schema
  }

  return {
    AccountInfo,
    ScreeningInfo,
    RecruitmentInfo,
    PostingSchema,
    RecruitmentApplication
  }
}
