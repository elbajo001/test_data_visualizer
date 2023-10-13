import Select from 'react-select'

const InputSelect = (props) => {
  return (
    <div className={`container-input ${props?.className ?? ''}`}>
      <label htmlFor={props?.id} className="my-0 mb-1 text-md">
        {props?.label ?? ''} <span>{props?.required ? '*' : ''}</span>
      </label>
      <Select
        id={props?.id}
        name={props?.id}
        options={props?.options ?? []}
        isMulti={props?.isMulti}
        placeholder={props?.placeholder}
        value={props?.value}
        onChange={(e) => {
          props?.onChange(e)
        }}
        required={props?.required ?? false}
      />
    </div>
  )
}

export default InputSelect