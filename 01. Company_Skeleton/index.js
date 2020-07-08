function solve(){
   let tableRows = document.querySelector("body > table > tbody")

   tableRows.addEventListener('click', handle);

   function handle(e) {
      let trRef = e.target.parentNode;

      Array.from(tableRows.children).forEach(x => {
         if (x !== trRef) {
            x.style.cssText = '';
         }
      });

      if (trRef.style.cssText === '') {
         trRef.style.cssText = 'background-color: #413f5e'
      } else {
         trRef.style.cssText = ''
      }
      // trRef.style.cssText = trRef.style.cssText ? '' : 'background-color: #413f5e';
   }
}
