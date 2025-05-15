import { dataElement } from '../../../Interfaces_and_types/Manage_account/interfaces_and_types_for_access';

interface field_props{
    element: dataElement;
    elementIndex: number
    state_disabled?: boolean
    children_p?: string,
}

export const Field: React.FC<field_props> = ({element,elementIndex,state_disabled,children_p}) => {

  const renderTag = () => {

    const TagName: 'p' | 'label' | 'button' | 'input' | 'button' | 'select'= element.tag;
    const props: {[key:string]:string | number | boolean | {(value:string) : void} } | undefined = {
      ...(element.name && {name: element.name}),
      ...(element.type && {type:element.type}),
      ...(TagName === "input" && {required:true}),
      ...(TagName === "button" && {disabled:state_disabled}),
    }
    const children: string | undefined = (
      TagName === "label" && element.text || 
      TagName === "button" && (state_disabled ? element.text_post_submit : element.text_pre_submit) ||
      TagName === "p" && (children_p ? children_p : undefined) ||
      undefined
    )

    return (<TagName key = {elementIndex} {...props}>{children}</TagName>)
  }

  return (
    <div>
      {renderTag()}
    </div>
  )
}

export default Field;
