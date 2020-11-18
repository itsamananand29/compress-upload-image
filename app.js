// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCe5wRhHD9EPKGtt8AG5PwBLesKDvaPuwg",
    authDomain: "upload-and-compress-file.firebaseapp.com",
    databaseURL: "https://upload-and-compress-file.firebaseio.com",
    projectId: "upload-and-compress-file",
    storageBucket: "upload-and-compress-file.appspot.com",
    messagingSenderId: "956695140612",
    appId: "1:956695140612:web:7f83e24353233c62f15851",
    measurementId: "G-FMT5CYPSB1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();



const compress= ()=>{
    
    const error = document.querySelector('#error');
    error.innerHTML='';
    document.querySelector('#input').src='';  
    document.querySelector('#output').src='';
    document.querySelector('#output2').src =''; 
    console.log('connected!!');


    const uploadedFile = document.querySelector('#upload').files[0];   //Select the upload image to create the preview of it 
     
    if(!uploadedFile){          // check if any file was selected by user or not 
         
        error.innerHTML = 'Image not selected !!';// display the error message  
        return
    }
    const extension =  uploadedFile.name.substr(uploadedFile.name.lastIndexOf('.') + 1);   // Get the extension of the file uploaded 
    if(extension !== 'jpeg' && extension !== 'jpg' && extension !== 'png' ){  // check if the file uploaded is of correct format 
         
        error.innerHTML = 'Select any image of type .jpeg, .jpg or .png format only !!'; // display error message
        return
        
    }
    else{
        document.getElementById('imageSize').innerHTML='Uploading images after compression ... ';
        const reader = new FileReader();  // creating a file reader object 
        reader.readAsDataURL(uploadedFile); // reading the content of the file uploaded 
        reader.onload= (e)=>{
        const inputImage = document.createElement('img'); // creating an img element using the document object model function 
        inputImage.src = e.target.result;   // set the image to be displayed uploaded by the user
        // console.log(e.target.result.split(','));
        
        // get the base64 name of the file 
        const base64Name = e.target.result.split(',')[1];
        
        // get the reference of the firebase storage bucket and store your file 
        let fileName = new Date()+'-image';
        firebase.storage().ref().child(fileName).putString(base64Name, 'base64', {contentType:'image/jpg'}) 
        .then(snapshot =>{  
            //console.log(snapshot.ref._delegate._location.path_);
            
            //retrive the data from firebase 
            var ref0 = firebase.storage().ref().child(snapshot.ref._delegate._location.path_);
            // Get the download URL
            ref0.getDownloadURL().then(function(url) {
            // Insert url into an <img> tag to "download"
            document.getElementById('imageSize').innerHTML='The image has been scaled for better preview';
            document.querySelector('#input').src=url;// set the image as the source of the output image
            }).catch(function(error) {
                console.log(error.code)
            });
        });
        // start the resizing 
        inputImage.onload = (e1)=>{   
            const outputImage1 = document.createElement('canvas'); // creating a canvas element using createElement method 
            // reduce the image size by 10
            outputImage1.width = e1.target.width/10;  
            outputImage1.height= e1.target.height/10;
            const contxt = outputImage1.getContext('2d');  // getContext is a dom function to get the rendering canvas element and its functions 
            contxt.drawImage(e1.target, 0, 0, outputImage1.width, outputImage1.height); // to draw the image on the context element , drawImage(image,x-axis,y-axis,width,height)
            const srcEncoded = contxt.canvas.toDataURL(e1.target,'image10/jpeg') // this will the image in the specified format 
            
            // get the base64 name of the file 
            const base64Name1 = srcEncoded.toString().split(',')[1];
         
            // get the reference of the firebase storage bucket and store your file 
            let fileName1 = new Date()+'-image_10';
            firebase.storage().ref().child(fileName1).putString(base64Name1, 'base64', {contentType:'image/jpg'})
            .then(snapshot =>{  
                //console.log(snapshot.ref._delegate._location.path_);

                //retrive the data from firebase 
                var ref1 = firebase.storage().ref().child(snapshot.ref._delegate._location.path_);
                // Get the download URL
                ref1.getDownloadURL().then(function(url) {
                // Insert url into an <img> tag to "download"
                document.querySelector('#output').src=url;// set the image as the source of the output image
                }).catch(function(error) {
                    console.log(error.code)
                });
            });
            const outputImage2 = document.createElement('canvas');// creating a canvas element using createElement method
            // reduce the image size by 20
            outputImage2.width = e1.target.width/20; 
            outputImage2.height= e1.target.height/20;
            const contxt2 = outputImage2.getContext('2d');// getContext is a dom function to get the rendering canvas element and its functions
            contxt2.drawImage(e1.target, 0, 0, outputImage2.width, outputImage2.height);// to draw the image on the context element , drawImage(image,x-axis,y-axis,width,height)
            const srcEncoded2 = contxt2.canvas.toDataURL(e1.target,'image20/jpeg')// this will the image in the specified format 
            
            // console.log(srcEncoded2.split(',')[1]);
            
            // get the base64 name of the file
            const base64Name2 = srcEncoded2.toString().split(',')[1];
            let fileName2 = new Date()+'-image_20';
            // get the reference of the firebase storage bucket and store your file 
            firebase.storage().ref().child(fileName2).putString(base64Name2, 'base64', {contentType:'image/jpg'})
            .then(snapshot =>{  
                //console.log(snapshot.ref._delegate._location.path_);
               
                document.getElementById('imageSize').innerHTML='Retriving the uploaded images ... ';
            
                //retrive the data from firebase 
                var ref2 = firebase.storage().ref().child(snapshot.ref._delegate._location.path_);
                // Get the download URL
                ref2.getDownloadURL().then(function(url) {
                // Insert url into an <img> tag to "download"
                document.querySelector('#output2').src=url;// set the image as the source of the output image
                }).catch(function(error) {
                    console.log(error.code)
                });
            });
       
        }    
        
    }
    }
    
}

