<template>
  <div class="kycupload">
    <Dashboard :title="user ? `${user.firstname} ${user.lastname}` : ''">
        <template v-slot:base>
            <div class="kycupload__body">
                <section class="kycupload__popup" v-if="showpopup">
                    <div class="kycupload__popup--content">
                        <p>KYC successfully uploaded</p>
                        <p>Review will take a moment...</p>
                    </div>
                </section>
                <div class="kycupload__kycinput" v-for="item in uploads">
                    <KycUploader :label="item"/>
                </div>
                <div class="kycupload__body--submit">
                    <button @click="submitFiles" v-if="!loading">Submit</button>
                    <button v-if="loading">Uploading</button>
                    <p v-if="error" class="error">{{ error }}</p>
                </div>

                <section class="kycupload__text">
                    <p>We understand how valuable your privacy is so we have tasked ourselves with</p>
                    <p>making sure we're not demanding too much as regards to these documents, and doing as much as we can</p>
                    <p>to keep the pervasive laws away from your finances</p>
                </section>
            </div>
        </template>
    </Dashboard>
  </div>
</template>

<script>
import userMixin from '@/mixins/user.js'
export default {
    data() {
        return {
            triggerSubmit: false,
            uploads: ['Photocopy or scan of a passport or valid ID'],
            filesToUpload: [],
            uploadsDone: [],
            loading: false,
            error: false,
            showpopup: false
        }
    },
    methods: {
        submitFiles() {
            if (this.uploads.length === this.filesToUpload.length) {
                this.$bus.$emit('uploadkyc');
                this.loading = true;
            } 
        },
    },
    mixins: [userMixin],
    computed: {
        kycFiles() {
            return this.$store.getters.kycFiles
        }
    },
    mounted() {
        this.$bus.$on('kycUploaded', (label) => {
            const uploadsDone = this.uploadsDone;
            this.uploadsDone = [label, ...uploadsDone];

            if (this.uploads.length === this.uploadsDone.length) {
                this.loading = false;
                this.showpopup = true;
                this.uploadsDone = [];
                this.filesToUpload = [];

                setTimeout(() => {
                    this.showpopup = false;
                }, 2000)
            }
        });

        this.$bus.$on('handleUpload', (label) => {
            const filesToUpload = this.filesToUpload;
            this.filesToUpload = [label, ...filesToUpload];
        });

        this.$bus.$on('warning', (warning) => {
            if (warning === 'empty file input field') {
                this.error = 'Add a file to upload';
            }
        });
    }
}
</script>

<style lang="scss" scoped>
@function scaleValue($value) {
    @return calc(
      #{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width))
    );
}

.kycupload {
    
    &__body {
        display: flex;
        flex-direction: column;

        &--submit {
            
            & button {
                background: #474DFF;
                padding: #{scaleValue(15)} #{scaleValue(40)};
                text-align: center;
                cursor: pointer;
                font-size: #{scaleValue(16)};
                border-radius: .2rem;
            }
        }
    }

    &__kycinput {
        margin-bottom: #{scaleValue(40)};
    }

    &__text {
        font-size: #{scaleValue(13)};
        margin-top: #{scaleValue(70)};
        line-height: #{scaleValue(17)};
    }

    &__popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;

        &--content {
            background: #fff;
            color: #000000;
            padding: #{scaleValue(17)};
            line-height: #{scaleValue(20)};
            margin-top: #{scaleValue(17)};
            font-size: #{scaleValue(17)};
        }
    }
}

.error {
    color: red;
    font-size: #{scaleValue(14)};
}
</style>
