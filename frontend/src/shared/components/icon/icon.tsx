export const Icon = ({ name }: { name: string }) => {
  return (
    <svg width="47">
      <use href={`./icons/main/symbol-defs.svg#icon-${name}`}></use>
    </svg>
  );
};
