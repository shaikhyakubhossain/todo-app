const baseUrlDev = 'http://localhost:4000';
const baseUrlProduction = 'https://todo-app-backend-five-dusky.vercel.app';

export const getUrl = () => {
    if(window.location.href.includes('localhost')){
        return baseUrlDev;
    }
    else{
        return baseUrlProduction;
    }
}