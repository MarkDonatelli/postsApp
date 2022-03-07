<template>
  <div class="modal-overlay">
    <div class="pt-3 pb-5 rounded-lg px-7 modal">
      <div class="flex justify-between modal-header">
        <h1 class="text-lg font-bold">Add Reply</h1>
        <img class="w-8 avatar" :src="image" />
      </div>

      <p class="pt-3 pb-2 text-secondaryGrayBlue">
        Fill out the form to add your reply!
      </p>
      <div class="w-full">
        <FormulateForm
          v-model="formValues"
          name="formAddReply"
          class="flex flex-col items-start send-form sm:flex-row"
          @submit="addReply()"
        >
          <FormulateInput
            type="textarea"
            class="w-full mr-0 sm:mr-4"
            name="reply"
            placeholder="Add reply..."
            validation="required"
            validation-name="reply"
          />

          <div class="flex w-full gap-3 mt-2 modal-footer">
            <button
              class="button button-modal bg-primaryRed hover:bg-primaryPaleRed"
              @click="closeModal"
            >
              Cancel
            </button>

            <button
              :disabled="isSending"
              class="button button-modal"
              type="submit"
            >
              Send
            </button>
          </div>
        </FormulateForm>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      image: '/img/avatars/image-ramsesmiron.png',
      formValues: {},
      isSending: false,
    }
  },
  mounted() {},
  methods: {
    addReply() {
      this.isSending = true

      // postDate
      const newDate = new Date()
      const currentDate = newDate.toLocaleDateString('en-US')
      const currentTime = newDate.toLocaleTimeString([], {
        timeStyle: 'short',
      })
      const createdAt = `${currentDate} ${currentTime}`

      setTimeout(() => {
        this.$store.commit('comments/pushReply', {
          id: Math.floor(Math.random() * 100),
          likes: 0,
          postDate: createdAt,
          name: 'danboyle',
          img: this.image,
          post: this.formValues.reply,
        })
        this.$formulate.reset('formAddReply')
        this.$store.commit('modals/toggleModal')
        this.$store.commit('comments/clearActive')

        this.isSending = false
      }, 1000)
    },
    closeModal() {
      this.$store.commit('modals/toggleModal')
      this.$store.commit('comments/clearActive')
    },
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  max-height: 500px;
  max-width: 90%;
  width: 375px;
}

.formulate-form--formAddReply {
  flex-direction: column;
}

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
