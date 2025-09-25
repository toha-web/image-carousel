export default async function (){
    const data = await fetch("https://picsum.photos/v2/list");
    const images = await data.json();
    return images;
}