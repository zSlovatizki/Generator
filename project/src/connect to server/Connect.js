import axios from 'axios';

export const FetchCablesByManager = () => {
   axios.get("https://localhost:44306/api/cable/get?idManager=7"
   ).then(({ data }) => console.log(data))
   return (
      <>
      </>
   )
}


