
const compress= ()=>{
    console.log('connected!!')
    const uploadedFile = document.querySelector('#upload').files[0];   //Select the upload image to create the preview of it 
    if(!uploadedFile){          // check if any file was selected by user or not 
        const error = document.querySelector('#error'); // display the error message 
        error.innerHTML = 'Image not selected !!'; 
        return
    }
    const extension = uploadedFile.name.split('.')[1];    // Get the extension of the file uploaded 
    if(extension !== 'jpeg' && extension !== 'jpg' && extension !== 'png' ){  // check if the file uploaded is of correct format 
        const error = document.querySelector('#error');    
        error.innerHTML = 'Select any image of type .jpeg, .jpg or .png format only !!'; // display error message
        return
        
    }
    
    const reader = new FileReader();  // creating a file reader object 
    reader.readAsDataURL(uploadedFile); // reading the content of the file uploaded 
    reader.onload= (e)=>{
        const inputImage = document.createElement('img'); // creating an img element using the document object model function 
        inputImage.src = e.target.result;   // set the image to be displayed uploaded by the user
        document.querySelector('#input').src = e.target.result;
        
         
        inputImage.onload = (e1)=>{   
            const outputImage1 = document.createElement('canvas'); // creating a canvas element using createElement method 
            // reduce the image size by 10
            outputImage1.width = e1.target.width/10;  
            outputImage1.height= e1.target.height/10;
            const contxt = outputImage1.getContext('2d');  // getContext is a dom function to get the rendering canvas element and its functions 
            contxt.drawImage(e1.target, 0, 0, outputImage1.width, outputImage1.height); // to draw the image on the context element , drawImage(image,x-axis,y-axis,width,height)
            const srcEncoded = contxt.canvas.toDataURL(e1.target,'image/jpeg') // this will the image in the specified format 
            document.querySelector('#output').src=srcEncoded;  // set the image as the source of the output image
            
            const outputImage2 = document.createElement('canvas');// creating a canvas element using createElement method
            // reduce the image size by 20
            outputImage2.width = e1.target.width/20; 
            outputImage2.height= e1.target.height/20;
            const contxt2 = outputImage2.getContext('2d');// getContext is a dom function to get the rendering canvas element and its functions
            contxt2.drawImage(e1.target, 0, 0, outputImage2.width, outputImage2.height);// to draw the image on the context element , drawImage(image,x-axis,y-axis,width,height)
            const srcEncoded2 = contxt2.canvas.toDataURL(e1.target,'image/jpeg')// this will the image in the specified format 
            document.querySelector('#output2').src=srcEncoded2;// set the image as the source of the output image
        }    
        
    }
}
