export const state = () => ({
  comments: [
    {
      id: 1,
      likes: 0,
      postDate: '12/22/2021 1:25pm',
      name: 'amyrobson',
      img: '/img/avatars/image-amyrobson.png',
      post: `Impressive! Though it seems the drag feature could be improved.
              But overall it looks incredible. You've nailed the design and the
              responsiveness at various breakpoints works really well.`,
      isActive: false,

      replies: [
        {
          id: 1,
          likes: 0,
          postDate: '12/26/2021 3:25pm',
          name: 'danboyle',
          img: '/img/avatars/image-avatar.png',
          post: `Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Veniam a aut quis
                recusandae magnam tenetur porro autem minima aspernatur
                voluptatum`,
        },
      ],
    },
  ],
})

export const mutations = {
  pushComment(state, comment) {
    state.comments.push(comment)
  },
  pushReply(state, comment) {
    state.comments.forEach((item) => {
      if (item.isActive) {
        item.replies.push(comment)
      }
    })
  },
  commentActive(state, id) {
    const foundComment = state.comments.find((comment) => comment.id === id)
    if (foundComment) foundComment.isActive = true
  },
  clearActive(state) {
    state.comments.forEach((comment) => (comment.isActive = false))
  },
  addLikes(state, id) {
    const foundComment = state.comments.find((comment) => comment.id === id)
    if (foundComment) foundComment.likes++
  },
  addReplyLikes(state, id) {
    state.comments.forEach((comment) => {
      const foundReply = comment.replies.find((reply) => reply.id === id)
      if (foundReply) foundReply.likes++
    })
  },
  subtractLikes(state, id) {
    const foundComment = state.comments.find((comment) => comment.id === id)
    if (foundComment) foundComment.likes--
  },
  subtractReplyLikes(state, id) {
    state.comments.forEach((comment) => {
      const foundReply = comment.replies.find((reply) => reply.id === id)
      if (foundReply) foundReply.likes--
    })
  },
  deleteReply(state, id) {
    state.comments.forEach((comment) => {
      comment.replies = comment.replies.filter((reply) => reply.id !== id)
    })
  },
}

export const getters = {}

export const actions = {}
