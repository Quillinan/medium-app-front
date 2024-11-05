interface SubtitleInputProps {
  subtitle: string;
  onSubtitleChange: (value: string) => void;
}

const SubtitleInput: React.FC<SubtitleInputProps> = ({
  subtitle,
  onSubtitleChange,
}) => (
  <input
    data-testid='subtitle-input'
    type='text'
    placeholder='Subtítulo'
    value={subtitle}
    onChange={e => onSubtitleChange(e.target.value)}
    className='mb-2 border rounded p-2'
  />
);

export default SubtitleInput;
