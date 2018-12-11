
      <template>
          <div>

              <h1>test input number</h1>
              <input  type="file" multiple>
          </div>

      </template>
      
      <script>
      export default {
          data(){
              return{
                  age:''
              }
          },
          watch:{
              age(value){
                  console.log(value)
              }
          }
      }
      </script>
      
      <style>
      
      </style>
      