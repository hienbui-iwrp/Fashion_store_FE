export const checkLogin = (router: any) => {
  if (localStorage.getItem('logged') === '') {
    router.push('/login')
  }
}