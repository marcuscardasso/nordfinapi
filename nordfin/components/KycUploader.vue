<template>
  <div class="kycuploader">
     <div class="kycuploader__body">
        <p class="kycuploader__body--p">{{label}}</p>
        <div class="kycuploader__body--form">
            <p class="kycuploader__body--p kycupload__body--p">{{ filename }}</p>
            <label class="kycuploader__body--inputarea">
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload( $event )"/>
            </label>
        </div>
      </div>
  </div>
</template>

<script>
import userMixin from '@/mixins/user.js';
export default {
    props: ['label'],
    data() {
        return {
            file: '',
            filename: ''
        }
    },
    methods: {
      handleFileUpload() {
          this.file = this.$refs.file.files[0];
          this.filename = this.file.name;

          const { label } = this;

          this.$bus.$emit('handleUpload', label );
      },
      submit(route) {
          const user_token = localStorage.getItem('nordtokenxtxtxt');
          const formData = new FormData();
          formData.append('kycfile', this.file);

          fetch(`${this.baseUrl}/${route}`, {
            method: "POST",
            body: formData,
            headers: {
               "Authorization": user_token
            }
          })
          .then(res => res.json())
          .then(json => {
              console.log('uploaded', json);
              this.$bus.$emit('kycUploaded', this.label);
              this.file = '';
              this.filename = '';
              this.$refs.file.value = ''
          })
          .catch(err => console.error(err));
      }
    },
    mixins: [userMixin],
    computed: {
        kycFiles() {
            return this.$store.getters.kycFiles
        }
    },
    mounted() {
        this.$bus.$on('uploadkyc', () => {
            if (!this.file) {
              return this.$bus.$emit('warning', 'empty file input field');
            }

            return this.submit('api/upload');
        })
    }
}
</script>

<style lang="scss" scoped>
@function scaleValue($value) {
    @return calc(
      #{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width))
    );
}

.kycuploader {

    &__body {
        font-size: #{scaleValue(20)};
        display: flex;
        flex-direction: column;

        &--p {
            margin-bottom: #{scaleValue(10)};
        }

        &--name {
            font-size: #{scaleValue(20)};
        }

        &--form {
            display: flex;
            flex-direction: column;
        }

        &--inputarea {
            display: flex;
            align-items: center;
        }
    }
}
</style>
