export function mode(){
    const body = document.querySelector('body'),
    sidebar = body.querySelector('.side-bar'),
    toggle = body.querySelector('.toogle'),
    searchBtn = body.querySelector('.search-box'),
    modeSwitch = body.querySelectorAll('.toogle-switch'),
    modeText = body.querySelector('.mode-text');

//     sistemColorPreference(body);
    if(toggle){
          toggle.addEventListener('click' ,()=>{
                sidebar.classList.toggle('close');
          })
    }
    modeSwitch.forEach(button=>{
      button.addEventListener('click' ,()=>{
            console.log('click button')
            body.classList.toggle('dark');
  
            if(body.classList.contains('dark')){
                  if(modeText){
                        modeText.innerText = "Light Mode";
                  }
            }
            else{
                  if(modeText){
                        modeText.innerText = "Dark Mode";
                  }
            }
      })  
    })
}

export function sistemColorPreference(body){
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark');
      }
}
