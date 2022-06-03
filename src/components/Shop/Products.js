import ProductItem from './ProductItem';
import classes from './Products.module.css';




const dummyProduct = [
 {
   id:1,
    title:'Automobile',
  price:90,
  description:'The first car i ever made!'},
  {
    id:2,
     title:'Compression ignition',
   price:10000,
   description:'The second car i ever made!'},
   {
    id:3 ,
     title:'Spark ignition Engine',
   price:90,
   description:'The third car i ever made!'},
   {
    id:4,
     title:'Mechanical Governor',
   price:4000,
   description:'The fourth car i ever made!'},
   
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>

        {dummyProduct.map((item, index)=>{
          return(
            <ProductItem
            title={item.title}
            price={item.price}
            description={item.description}
            key= {index}
            id = {item.id}
          />
          )

        })}
     
      </ul>
    </section>
  );
};

export default Products;
