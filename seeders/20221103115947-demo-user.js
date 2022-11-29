'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( 'Products', [

      {
      
      name: 'Macarrones',
      
      price: '4',
      
      description:'Pasta seca',
      
      CategoryId:'1',
      
      createdAt: new Date(),
      
      updatedAt: new Date()
      
      },

      {
      
        name: 'Espaguetis',
        
        price: '2',
        
        description:'Pasta seca',
        
        CategoryId:'1',
        
        createdAt: new Date(),
        
        updatedAt: new Date()
        
        },

        {
      
          name: 'Pechuga de pollo',
          
          price: '5',
          
          description:'Carne de ave',
          
          CategoryId:'2',
          
          createdAt: new Date(),
          
          updatedAt: new Date()
          
          },

          {
      
            name: 'Solomillo',
            
            price: '7',
            
            description:'Cerdo iberico',
            
            CategoryId:'3',
            
            createdAt: new Date(),
            
            updatedAt: new Date()
            
            },

            {
      
              name: 'Presa iberica',
              
              price: '12',
              
              description:'cerdo iberico',
              
              CategoryId:'3',
              
              createdAt: new Date(),
              
              updatedAt: new Date()
              
              }

      

        
      
      ])
      
      },
      
      async down (queryInterface, Sequelize) {
      
      }
      
      }