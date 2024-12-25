type propsType = {
  type: string;
  placeholder: string;
  handleUpdateOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input(props: propsType) {
  return (
    <div>
      <input
        className="bg-gray-300 border placeholder:text-slate-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        type={props.type}
        placeholder={props.placeholder}
        onChange={(event) => props.handleUpdateOnChange(event)}
      />
    </div>
  );
}
