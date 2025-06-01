import ArrowButton from '../shared/components/buttons/arrowButtons';
import CardButton from '../shared/components/buttons/cardButtons';
import PlusButton from '../shared/components/buttons/plusButtons';
import ProductButton from '../shared/components/buttons/productButtons';
import { ProductCard } from '../shared/components/productCard/ProductCard';
import CategoryTabs from '../shared/components/tabs/categoryTabs';
import GenderTabs from '../shared/components/tabs/genderTabs';
import SizeTabs from '../shared/components/tabs/sizeTabs';

export default function UiPage() {
  return (
    <>
      <h2>КНОПКИ</h2>
      <br />
      <ProductButton />
      <ProductButton size="small" />
      <CardButton />
      <CardButton size="small" />
      <ArrowButton direction="left" />
      <ArrowButton direction="right" />
      <PlusButton />
      <h2>ТАБЫ</h2>
      <br />
      <CategoryTabs />
      <SizeTabs />
      <GenderTabs />
      <h2>КАРТОЧКА ТОВАРА</h2> <br />
      <ProductCard
        product={{
          name: undefined,
          description: undefined,
          price: undefined,
          is_active: undefined,
          category_id: undefined,
          image_url: undefined,
          id: 0,
          created_at: '',
          updated_at: undefined,
          variants: undefined,
        }}
        onAddToCart={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
}
