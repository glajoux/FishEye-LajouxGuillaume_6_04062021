const recupJSON = async () => {
    await fetch("FishEyeData.json")
      .then((res) => res.json())
      .then(function(data){
        dataPhotographes = data.photographers;
        dataMedias = data.media;
      })
      .catch(function (err) {
        console.log(err);
      });
      console.log(dataPhotographes);
      // console.log(dataMedias);
  };
  

const pagePhotographe = async() =>{
    await recupJSON();
    if (url.includes(insertPointHtml(dataPhotographes.name))){
      console.log('gg');
    }
  };

  pagePhotographe()