import urlMixin from '@/mixins/url.js'

export default {
    data() {
        return {}
    },
    mixins: [urlMixin],
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    methods: {
        authenticate(credentials, route) {
            fetch(`${this.baseUrl}/${route}`, {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => {
              console.log(json)
               const user = json.user;
               const token = json.token;
               console.log(user, token);
               this.setUser(user, token)
            })
            .catch(err => console.log(err));
        },
        setUser(user, token) {
            localStorage.setItem('norduserxtxtxt', JSON.stringify(user));
            localStorage.setItem('nordtokenxtxtxt', JSON.stringify(token));
            const user_details = JSON.parse(localStorage.getItem('norduserxtxtxt'));
            const user_token = JSON.parse(localStorage.getItem('nordtokenxtxtxt'));
            user_details.token = user_token;

            this.$store.dispatch('storeUser', user_details);
        },
        getUsers() {
            const user_details = JSON.parse(localStorage.getItem('norduserxtxtxt'));
            const user_token = JSON.parse(localStorage.getItem('nordtokenxtxtxt'));
      
            fetch(`${this.baseUrl}/api/getusers`, {
                method: "GET",
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  "Authorization": user_token
                }
            })
            .then(response => response.json())
            .then(json => {
                  const users = json.users;
                  console.log(users)
                  this.$store.dispatch('storeUsers', users);
            });
          },
    }
}