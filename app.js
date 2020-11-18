
const process= ()=>{
    console.log('connected!!')
    const uploadedFile = document.querySelector('#upload').files[0];
    if(!uploadedFile){
        const error = document.querySelector('#error');
        error.innerHTML = 'No image selected';
        return
    }
    const reader = new FileReader();
    reader.readAsDataURL(uploadedFile);
    reader.onload= (e)=>{
        const inputImage = document.createElement('img');
        inputImage.src = e.target.result;
        document.querySelector('#input').src = e.target.result;
        inputImage.onload = (e1)=>{
            const outputImage1 = document.createElement('canvas');
            outputImage1.width = e1.target.width/10;
            outputImage1.height= e1.target.height/10;
            const contxt = outputImage1.getContext('2d');
            contxt.drawImage(e1.target, 0, 0, outputImage1.width, outputImage1.height);
            const srcEncoded = contxt.canvas.toDataURL(e1.target,'image/jpeg')
            document.querySelector('#output').src=srcEncoded;
            const outputImage2 = document.createElement('canvas');
            outputImage2.width = e1.target.width/20;
            outputImage2.height= e1.target.height/20;
            const contxt2 = outputImage2.getContext('2d');
            contxt2.drawImage(e1.target, 0, 0, outputImage2.width, outputImage2.height);
            const srcEncoded2 = contxt2.canvas.toDataURL(e1.target,'image/jpeg')
            document.querySelector('#output2').src=srcEncoded2;
        }    
        
    }
}
const compressby10 =()=>{
    
}
const compressby20=()=>{
    
}