interface TitleInputProps {
  title: string;
  onTitleChange: (value: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ title, onTitleChange }) => (
  <input
    type='text'
    placeholder='Título'
    value={title}
    onChange={e => onTitleChange(e.target.value)}
    className='mb-2 border rounded p-2'
  />
);

export default TitleInput;
