import * as React from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface ProfileSelectProps {
  profiles: { label: string; value: string }[]
  setProfile: (profile: string | null) => void
}

export function ProfileSelect({ profiles, setProfile }: ProfileSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  // React.useEffect(() => {
  //   console.log('useEffect | New profile value:', value)
  // }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          role="combobox"
          aria-expanded={open}
          className="w-[240px] justify-between"
        >
          {value
            ? profiles.find((profile) => profile.value === value)?.label
            : 'Select profile...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandInput placeholder="Search profile..." className="h-9" />
          <CommandEmpty
            firstRender
            className="flex flex-col gap-4 items-center"
          >
            🙊 No profiles found
          </CommandEmpty>
          <CommandGroup>
            {profiles.map((profile) => {
              return (
                <CommandItem
                  key={profile.value}
                  value={profile.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setProfile(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  {profile.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === profile.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}