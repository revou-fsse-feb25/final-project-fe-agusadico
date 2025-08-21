import { getSortDisplayText } from '../../utils/productUtils';

type SortSelectorProps = {
  sortParam: string;
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function SortSelector({ sortParam, handleSortChange }: SortSelectorProps) {
  const sortBy = getSortDisplayText(sortParam);
  
  return (
    <select 
      className="border border-gray-300 rounded py-1 px-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
      value={sortBy}
      onChange={handleSortChange}
    >
      <option>Default Sorting</option>
      <option>Sort by price: low to high</option>
      <option>Sort by price: high to low</option>
    </select>
  );
}