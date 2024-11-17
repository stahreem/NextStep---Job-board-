/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const DynamicSection = ({ title, field, items, fields, onAdd, onChange, onRemove }) => (
  <div>
    <h2 className="mb-2 text-lg font-semibold">{title}</h2>
    {items.map((item, index) => (
      <div key={index} className="grid grid-cols-3 gap-4 mb-4">
        {fields.map((f) => (
          <Input
            key={f.name}
            type="text"
            placeholder={f.placeholder}
            value={item[f.name]}
            onChange={(e) => onChange(index, f.name, e.target.value, field)}
          />
        ))}
        {items.length > 1 && (
          <Button
            variant="destructive"
            onClick={() => onRemove(field, index)}
            type="button"
          >
            Remove
          </Button>
        )}
      </div>
    ))}
    <Button type="button" onClick={onAdd}>
      Add {title}
    </Button>
  </div>
);

export const DynamicArraySection = ({ title, field, items, onAdd, onChange, onRemove }) => (
  <div>
    <h2 className="mb-2 text-lg font-semibold">{title}</h2>
    {items.map((item, index) => (
      <div key={index} className="flex items-center gap-4 mb-4">
        <Input
          type="text"
          placeholder={`Enter ${title.slice(0, -1)}`}
          value={item}
          onChange={(e) => onChange(index, null, e.target.value, field)}
        />
        {items.length > 1 && (
          <Button
            variant="destructive"
            onClick={() => onRemove(field, index)}
            type="button"
          >
            Remove
          </Button>
        )}
      </div>
    ))}
    <Button type="button" onClick={onAdd}>
      Add {title}
    </Button>
  </div>
);
