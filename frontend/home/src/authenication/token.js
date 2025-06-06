const getCSRFToken = () => {
    const token = document.cookie.split(';').find(item => item.trim().startsWith('csrftoken='));
    return token ? token.split('=')[1] : '';
  };

  export default getCSRFToken