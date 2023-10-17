# useInput

Input의 value, onChange를 내부적으로 처리한 Hook입니다.

- 옵션으로 validate를 설정할 수 있습니다.

## Example

```jsx
const { value, onChange } = useInput('');

return <input value={value} onChange={onChange} />;
```

- validate(15자 미만일 경우) 설정한 경우

```jsx
  const { value, onChange } = useInput('', {
    validate: newValue => newValue.length < 15,
  });
  return (
    <div>
      <p> Max length 15 </p>
      <input value={value} onChange={onChange} />
        Value is <b>{myInput.value}</b>
    </div>
  );
}
```
