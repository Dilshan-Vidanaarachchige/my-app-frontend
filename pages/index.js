import { mongooseConnect } from "@/lib/mongoose";
import Hero from "./components/Hero";
import { Product } from "@/models/Product";
import Products from "./components/Products";
import Collection from "./components/Collection";


export default function Home({ featuredProduct, newProducts, collectionProduct1, allProducts }) {
  return (
    <main
      className={`min-h-screen p-4 bg-background `}
    >
{/* import hero page-home  */}
      <Hero product={featuredProduct} />
      <hr class="my-1 h-px border-0 bg-gray-300" />

{/* import products page-  */}
      <Products products={newProducts} />
      <hr class="my-1 h-px border-0 bg-gray-300" />

      <Collection product={collectionProduct1} />

      <hr class="my-0 h-px border-0 bg-gray-300 " />
      
      
    </main>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();

{/* home main image/ mondodb eke user-id */} 
    const featuredId = '66bb2a2dab8c9023e43f102c';

{/* new collection image / mondodb eke user-id*/}
    const collectionId = '66bb293aab8c9023e43f1028';

    const featuredProduct = await Product.findById(featuredId);
    const collectionProduct1 = await Product.findById(collectionId);
    const newProducts = await Product.find({}, null, {sort: {'_id': 1}, limit: 5})
    const allProducts = await Product.find({}, null, {sort: {'_id': 1}})

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      collectionProduct1: JSON.parse(JSON.stringify(collectionProduct1)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    }
  }
}
