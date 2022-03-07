<template>
  <div>
    <div
      class="flex items-center min-h-screen px-0 pt-0 wrapper sm:px-4 bg-secondaryLighterGray md:bg-white"
    >
      <div
        class="container h-full px-0 py-10 mx-auto shadow-none md:shadow-md sm:h-auto sm:px-5 bg-secondaryLighterGray"
      >
        <div class="container__inner">
          <CommentList />
          <AddComment />
        </div>
      </div>
    </div>
    <Modal v-if="showModal" />
  </div>
</template>

<script>
import AddComment from '~/components/AddComment.vue'
import CommentList from '~/components/CommentList.vue'
import Modal from '~/components/Modal.vue'
export default {
  components: {
    AddComment,
    CommentList,
    Modal,
  },
  data() {
    return {}
  },
  computed: {
    showModal() {
      return this.$store.state.modals.showModal
    },
  },
}
</script>
