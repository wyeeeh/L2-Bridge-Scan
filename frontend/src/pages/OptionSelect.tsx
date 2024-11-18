import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// 定义选项类型
interface SelectOption {
    value: string;
    label: string;
}

interface OptionSelectProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

function OptionSelect({
    options,
    value,
    onChange,
    placeholder = "Select option",
    className = "w-[120px]"
}: OptionSelectProps) {
    return (
        <Select
            value={value}
            onValueChange={onChange}
        >
            <SelectTrigger className={`${className} shadow-md hover:shadow-lg transition-shadow`}>
                <SelectValue placeholder={placeholder}>
                    {options.find(opt => opt.value === value)?.label}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default OptionSelect
