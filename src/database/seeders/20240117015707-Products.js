'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: "Whiskas Sabor Pescado x10kg",
        price: 3000,
        stock: 10,
        // petTypes_id: 2,
        brands_id: 1,
        petAges_id: 2,
        description: "Whiskas® Adulto sabor Pescado es alimento seco 100% completo y balanceado, desarrollado especialmente para gatos adultos mayores a 1 año de edad. La nueva receta de Whiskas Alimento Seco combina la nutrición que tu gato necesita, con el sabor que ama. Desarrollado nutricionalmente con veterinarios para ayudarlo a mantenerse saludable y ronroneando durante toda la vida. Y ahora, con prebióticos que ayudan a una buena digestión. - Con prebioticos que ayudan a proteger su salud intestinal. - Con múltiples fibras que ayudan al funcionamiento gastrointestinal, contribuyendo al bienestar de tu gato. - Con Omega 6 y Zinc que ayudan a tener pelo saludable para tu mascota. - Con minerales controlados que ayudan a mantener un tracto urinario saludable. ¡Probá también Whiskas SOBRECITO! A tu gato le encantará! Whiskas® es un alimento avalado y recomendado por el Centro de Investigación WALTHAM, una de las autoridades mundiales líderes en nutrición, cuidado y bienestar animal",
        discount: 20,
        image: "producto-whiskasSaborPescado.webp"
      },
      {
        name: "Sabrositos Gato Mix Adulto 10kg",
        price: 10690,
        stock: 10,
        // petTypes_id: 2,
        brands_id: 2,
        petAges_id: 2,
        description: "Dale a tu gato el balance adecuado en un delicioso alimento de pollo, carne y vegetales que aporta todos los nutrientes que necesita, además de antioxidantes, que lo ayudan a reforzar su sistemas inmune y mantener sus huesos sanos y fuertes, calcio y fósforo, que favorece a un adecuado crecimiento, y la taurina, para un corazón y una vista saludables.",
        discount: 10,
        image: "producto-SabrositosGatoAdulto.webp"
      },
      {
        name: "Power Pipeta Perro 20 a 40Kg",
        price: 1940,
        stock: 10,
        // petTypes_id: 1,
        brands_id: 6,
        description: "Power Ultra la pipeta pulguicida, garrapaticida y repelente de mosquitos más poderosa del mercado, debido a su mayor volumen y concentración de principios activos. Se puede aplicar en cualquier momento, aún después de un baño, no hay que esperar mucho, solo hace falta que la mascota esté seca.",
        discount: 20,
        image:"producto-pipetaPower-20-a-40-Perros.webp"
      },
      {
        name: "Kongo Natural Perro Adulto Mediano Y Grande X 15 Kg",
        price: 11599,
        stock: 10,
        // petTypes_id: 1,
        brands_id: 3,
        petAges_id: 2,
        description: "Kongo Natural es un alimento balanceado perros adultos medianos y grandes que proporciona una mejor digestión, protección renal y aporta energía.",
        discount: 10,    
        image:"Producto-KongoMedianoYAdulto.webp"
      },
      {
        name: "Kongo Natural Gold Perro Adulto x 21 Kg",
        price: 13000,
        stock: 10,
        // petTypes_id: 1,
        brands_id: 3,
        petAges_id: 2,
        description: "Kongo Gold Adulto es un producto super premium diseñado exclusivamente para cubrir las necesidades de un crecimiento saludable y un desarrollo sano a lo largo de toda la vida de tu mascota. Formulado con materias primas ingredientes y proteínas seleccionadas de primera calidad que cumplen rigurosas normas de aprobación para formar parte de una formula novedosa y exclusiva que solo kongo gold puede brindar.",
        discount: 20,
        image:"Producto-KongoGoldAdultosPack.webp"
      },
      {
        name: "Alimento Balanceado para Conejos x 750 Gr",
        price: 1290,
        stock: 10,
        // petTypes_id: 5,
        brands_id: 5,
        description: "El Balanceado para Conejo provee una optima nutrición con todas las vitaminas y nutrientes, manteniendo a su roedor vital y feliz.",
        discount: 10,
        image:"Producto-AlimentoConejos.webp"
      },
      {
        name: "Alimento Peces Tropicales Acuario Escamas Tetra Color 200gr",
        price: 23345,
        stock: 10,
        // petTypes_id: 4,
        brands_id: 4,
        description: "Tetra Color Bits es sin dudas uno de los mejores alimentos para peces tropicales de mayor tamaño como Discus y Escalares. Realza el color y esta reforzado con vitaminas. Formulado para tener mayor flotabilidad y ser aprovechado tanto por peces que comen en la superficie, como los que se alimentan en la zona media e inferior del acuario. Para peces pequeños puede ser desmenuzado y asi sera mejor aprovechado.",
        discount: 20,
        image:"Producto-AlimentoPeces.webp"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
