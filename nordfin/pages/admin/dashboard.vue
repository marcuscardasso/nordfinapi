<template>
  <div class="dashboard">
    <h1 class="dashboard__h1">Admin Dashboard</h1>
    <div class="dashboard__list" v-if="users">
      <h2 class="dashboard__h2">SwissNordic Users</h2>
      <h2>{{ user ? user.name : '' }}</h2>
      <div v-for="item in users" class="dashboard__user">
        <span @click="editUser(item._id)" class="dashboard__user--edit">Edit user</span>
        <div class="dashboard__user--area">
          <div class="dashboard__user--section">
            <span>Firstname:</span>
            <span>{{item.firstname}}</span>
          </div>
          <div class="dashboard__user--section">
            <span>Lastname:</span>
            <span>{{item.lastname}}</span>
          </div>
        </div>
        <div class="dashboard__user--area">
          <div class="dashboard__user--section email">
            <span>Email:</span>
            <span>{{item.email}}</span>
          </div>
          <div class="dashboard__user--section">
            <span>Account number:</span>
            <span>{{item.phonenumber}}</span>
          </div>
        </div>
        <div class="dashboard__user--area">
          <div class="dashboard__user--section">
            <span>Phonenumber:</span>
            <span>{{item.accountNumber}}</span>
          </div>
          <div class="dashboard__user--section">
            <span>Balance</span>
            <span>{{item.balance}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import adminMixin from '@/mixins/admin.js'

export default {
  mixins: [adminMixin],
  mounted() {
    console.log(this.users)
  },
  methods: {
    editUser(id) {
      console.log(id);
      this.$router.push(`/admin/user?id=${id}`)
    }
  },
  beforeMount() {
    this.getUsers();
  },
  computed: {
    users() {
       return this.$store.getters.users
    }
  }
}
</script>

<style lang="scss" scoped>
@function scaleValue($value) {
    @return calc(
      #{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width))
    );
}

.dashboard {
    padding: #{scaleValue(100)};

    &__h1 {
      margin-bottom: #{scaleValue(30)};
      font-weight: 400;
      font-size: #{scaleValue(30)};
    }

    &__h2 {
      margin-bottom: #{scaleValue(30)};
      font-weight: 400;
      font-size: #{scaleValue(20)};
    }

    &__list {
      margin-top: #{scaleValue(30)};
    }

    &__user {
      margin-bottom: #{scaleValue(40)};
      color: #000;
      background: #fff;
      border-radius: .5rem;
      position: relative;

      padding: #{scaleValue(17)};

      &--area {
        display: flex;
        margin-bottom: #{scaleValue(20)};
        font-size:  #{scaleValue(20)};
        text-transform: capitalize;
        justify-content: space-between;

        width: #{scaleValue(700)};
      }

      &--section {
        display: flex;
        flex-direction: column;
        flex-basis: #{scaleValue(200)};

        & span {
          display: inline-block;

          &:nth-child(1) {
             font-size:  #{scaleValue(14)};
             margin-bottom: #{scaleValue(7)};
             font-weight: 700;
             color: #474DFF;
          }

          &:nth-child(2) {
             font-size:  #{scaleValue(18)};
          }

          &.email {
            text-transform: lowercase;
             font-size:  #{scaleValue(20)};
          }
        }
      }

      &--edit {
        position: absolute;
        right: 0;
        top: 0;
        background: #474DFF;
        border-radius: .3rem;
        color: #fff;
        padding: #{scaleValue(15)} #{scaleValue(20)};
        cursor: pointer;
      }
    }
}
</style>
