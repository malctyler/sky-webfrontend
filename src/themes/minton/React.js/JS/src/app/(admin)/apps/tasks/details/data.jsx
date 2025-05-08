// images
import avatarImg2 from "@/assets/images/users/avatar-2.jpg";
import avatarImg3 from "@/assets/images/users/avatar-3.jpg";
const tasks = [{
  id: "#MN2048",
  title: "Minton admin Dashboard Re-design",
  project_name: "Examron Envirenment",
  assigned_to: "Darnell McCormick",
  assignee_avatar: avatarImg2,
  due_date: "Today 10am",
  completed: false,
  priority: "High",
  stage: "Todo",
  checklists: [{
    id: 1,
    title: "Find out the old contract documents",
    completed: true
  }, {
    id: 2,
    title: "Organize meeting sales associates to understand need in detail",
    completed: false
  }, {
    id: 3,
    title: "Make sure to cover every small details",
    completed: false
  }],
  description: "If several languages coalesce of the resulting language is more simple than the existing",
  attachments: [{
    id: 1,
    filename: "sales-assets.zip",
    size: "2.3 MB"
  }, {
    id: 2,
    filename: "new-contarcts.docx",
    size: "1.3 MB"
  }],
  comments: [{
    id: 1,
    author: "Arya Stark",
    text: "Should I review the last 3 years legal documents as well?",
    posted_on: "4:30am",
    author_avatar: avatarImg2
  }, {
    id: 2,
    author: "Gary Somya",
    text: "@Arya FYI..I have created some general guidelines last year.",
    posted_on: "3:30am",
    author_avatar: avatarImg3
  }]
}];
export { tasks };