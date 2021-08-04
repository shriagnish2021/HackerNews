module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'job-post': "url('https://d13dtqinv406lk.cloudfront.net/laravel-images/banner-emp.png')",
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
