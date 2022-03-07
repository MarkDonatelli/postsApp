<template>
  <div
    class="flex px-4 py-4 bg-white rounded-md shadow-md add-comment mt-7 sm:mt-0 sm:px-5 sm:py-5"
  >
    <div class="flex justify-between w-full add-comment__items">
      <div class="hidden col-avatar mr-14px sm:block">
        <img class="avatar w-11" :src="image" />
      </div>
      <div class="w-full input">
        <FormulateForm
          v-model="formValues"
          name="formAddComment"
          class="flex flex-col items-start send-form sm:flex-row"
          @submit="addComment"
        >
          <FormulateInput
            type="textarea"
            class="w-full mr-0 sm:mr-4"
            name="comment"
            placeholder="Add a comment..."
            validation="required"
            validation-name="comment"
          />

          <button
            :disabled="isSending"
            class="hidden button sm:block"
            type="submit"
          >
            {{ isSending ? 'Sending...' : 'Send' }}
          </button>

          <div class="flex items-center justify-between w-full mt-2 sm:hidden">
            <div class="col-avatar">
              <img
                class="w-8 avatar"
                src="/img/avatars/image-ramsesmiron.png"
              />
            </div>
            <button :disabled="isSending" class="button" type="submit">
              {{ isSending ? 'Sending...' : 'Send' }}
            </button>
          </div>
        </FormulateForm>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValues: {},
      isSending: false,

      image: '/img/avatars/image-ramsesmiron.png',
    }
  },
  methods: {
    addComment() {
      this.isSending = true

      // postDate
      const newDate = new Date()
      const currentDate = newDate.toLocaleDateString('en-US')
      const currentTime = newDate.toLocaleTimeString([], {
        timeStyle: 'short',
      })
      const createdAt = `${currentDate} ${currentTime}`

      setTimeout(() => {
        this.$store.commit('comments/pushComment', {
          id: this.$store.state.comments.comments.length + 1,
          likes: 0,
          postDate: createdAt,
          name: 'danboyle',
          img: this.image,
          post: this.formValues.comment,
          isActive: false,
          replies: [],
        })
        this.$formulate.reset('formAddComment')
        this.isSending = false
      }, 1000)
    },
  },
}
</script>

<style scoped>
::v-deep textarea {
  width: 100%;
  min-height: 80px;
  padding: 5px 10px;

  resize: none;

  color: hsl(211, 10%, 45%);
  border: 1px solid hsl(239, 57%, 85%);
  border-radius: 0.375rem;
}

::v-deep .formulate-input-wrapper {
  width: 100%;
}

::v-deep .formulate-input-error {
  color: hsl(358, 79%, 66%);
}
</style>
