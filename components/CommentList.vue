<template>
  <!-- comments list -->
  <div class="comments-list">
    <!-- comment -->
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="comments-list__item"
    >
      <!-- original comment -->
      <div
        class="flex items-start p-3 mb-3 bg-white rounded-md shadow-md comments-list__item--original sm:p-5 sm:mb-4"
      >
        <div
          class="comments-list__item--actions hidden sm:flex flex-col items-center py-3 px-2.5 bg-secondaryLighterGray rounded-lg min-w-[6%]"
        >
          <button @click="addLike(comment.id)">
            <img src="/img/icon-plus.svg" />
          </button>
          <p class="py-3 text-primaryBlue">{{ comment.likes }}</p>
          <button
            class="disabled:cursor-not-allowed"
            :disabled="comment.likes < 1"
            @click="subtractLike(comment.id)"
          >
            <img src="/img/icon-minus.svg" />
          </button>
        </div>
        <div class="w-full ml-0 content sm:ml-5">
          <div
            class="flex items-center justify-between pb-3 content__user-info"
          >
            <div class="flex items-center content__user-info--main">
              <img class="w-8 avatar" :src="comment.img" />
              <p class="px-3 text-secondaryDarkBlue">{{ comment.name }}</p>
              <p class="text-sm text-secondaryGrayBlue">
                {{ comment.postDate }}
              </p>
            </div>
            <div class="hidden content__user-info--action sm:block">
              <button
                class="flex items-center"
                @click="
                  replyToComment(comment.id)
                  active(comment.id)
                "
              >
                <img src="/img/icon-reply.svg" />
                <span class="pl-1 text-primaryBlue">Reply</span>
              </button>
            </div>
          </div>

          <div class="content__copy">
            <p class="text-secondaryGrayBlue">
              {{ comment.post }}
            </p>
          </div>

          <div class="flex items-center justify-between mt-2 sm:hidden">
            <div
              class="flex items-center justify-around w-20 py-1 rounded-md comments-list__item--actions--mobile bg-secondaryLighterGray"
            >
              <button @click="addLike(comment.id)">
                <img src="/img/icon-plus.svg" />
              </button>
              <p class="text-primaryBlue">{{ comment.likes }}</p>
              <button
                class="disabled:cursor-not-allowed"
                :disabled="comment.likes < 1"
                @click="subtractLike(comment.id)"
              >
                <img src="/img/icon-minus.svg" />
              </button>
            </div>

            <div class="sm:hidden content__user-info--action">
              <button
                class="flex items-center"
                @click="
                  replyToComment(comment.id)
                  active(comment.id)
                "
              >
                <img src="/img/icon-reply.svg" />
                <span class="pl-1 text-primaryBlue">Reply</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- end original comment -->

      <!-- reply chain -->
      <div
        v-if="reply"
        class="pl-3 ml-0 border-l-2 sm:pl-9 sm:ml-10 reply-chain border-l-primaryGrayBlue"
      >
        <!-- replies -->
        <div
          v-for="replyInstance in comment.replies"
          :key="replyInstance.id"
          class="flex items-start p-3 mb-3 bg-white rounded-md shadow-md sm:p-5 sm:mb-4 comments-list__item--original"
        >
          <div
            class="min-w-[6%] comments-list__item--actions hidden sm:flex flex-col items-center py-3 px-2.5 bg-secondaryLighterGray rounded-lg"
          >
            <button @click="addLikeReply(replyInstance.id)">
              <img src="/img/icon-plus.svg" />
            </button>
            <p class="py-3 text-primaryBlue">{{ replyInstance.likes }}</p>
            <button
              class="disabled:cursor-not-allowed"
              :disabled="replyInstance.likes < 1"
              @click="subtractLikeReply(replyInstance.id)"
            >
              <img src="/img/icon-minus.svg" />
            </button>
          </div>
          <div class="w-full sm:ml-5 content">
            <div
              class="flex items-center justify-between pb-3 content__user-info"
            >
              <div class="flex items-center content__user-info--main">
                <img
                  class="w-8 avatar"
                  src="/img/avatars/image-ramsesmiron.png"
                />
                <p class="px-3 text-secondaryDarkBlue">
                  {{ replyInstance.name }}
                </p>
                <p class="text-sm text-secondaryGrayBlue">
                  {{ replyInstance.postDate }}
                </p>
              </div>
              <div class="hidden gap-4 content__user-info--action sm:flex">
                <button
                  class="flex items-center"
                  @click="delReply(replyInstance.id)"
                >
                  <img src="/img/icon-delete.svg" />
                  <span class="pl-1 text-primaryRed">Delete</span>
                </button>
              </div>
            </div>
            <div class="content__copy">
              <p class="text-secondaryGrayBlue">
                <span class="text-primaryBlue">@amyrobson</span>
                {{ replyInstance.post }}
              </p>
            </div>

            <div class="flex items-center justify-between mt-2 sm:hidden">
              <div
                class="flex items-center justify-around w-20 py-1 rounded-md comments-list__item--actions--mobile bg-secondaryLighterGray"
              >
                <button @click="addLikeReply(replyInstance.id)">
                  <img src="/img/icon-plus.svg" />
                </button>
                <p class="text-primaryBlue">{{ replyInstance.likes }}</p>
                <button
                  class="disabled:cursor-not-allowed"
                  :disabled="replyInstance.likes < 1"
                  @click="subtractLikeReply(replyInstance.id)"
                >
                  <img src="/img/icon-minus.svg" />
                </button>
              </div>

              <div class="flex gap-3 sm:hidden content__user-info--action">
                <button
                  class="flex items-center"
                  @click="delReply(replyInstance.id)"
                >
                  <img src="/img/icon-delete.svg" />
                  <span class="pl-1 text-primaryRed">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end reply chain -->
    </div>
  </div>
  <!-- end comments list -->
</template>

<script>
export default {
  components: {},
  data() {
    return {
      reply: true,
    }
  },
  computed: {
    comments() {
      return this.$store.state.comments.comments
    },
  },
  mounted() {},
  methods: {
    addLike(id) {
      this.$store.commit('comments/addLikes', id)
    },
    addLikeReply(id) {
      this.$store.commit('comments/addReplyLikes', id)
    },
    subtractLike(id) {
      this.$store.commit('comments/subtractLikes', id)
    },
    subtractLikeReply(id) {
      this.$store.commit('comments/subtractReplyLikes', id)
    },
    replyToComment(id) {
      this.$store.commit('modals/toggleModal', id)
    },
    delReply(id) {
      this.$store.commit('comments/deleteReply', id)
    },
    active(id) {
      this.$store.commit('comments/commentActive', id)
      console.log(id)
    },
  },
}
</script>
