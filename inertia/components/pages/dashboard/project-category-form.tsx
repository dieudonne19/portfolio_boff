import { Form } from '@adonisjs/inertia/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

function FieldError({ error }: { error?: string }) {
  if (!error) return null

  return <p className="text-sm text-red-600">{error}</p>
}

type ProjectCategoryFormProps = {
  action: string
  method: 'post' | 'put'
  submitLabel: string
  submittingLabel: string
  defaults?: {
    name?: string
    label?: string
  }
}

export function ProjectCategoryForm({
  action,
  method,
  submitLabel,
  submittingLabel,
  defaults,
}: ProjectCategoryFormProps) {
  return (
    <Form action={action} method={method}>
      {({ errors, processing }) => (
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Internal name</Label>
            <Input
              id="name"
              name="name"
              placeholder="web-app"
              defaultValue={defaults?.name ?? ''}
            />
            <p className="text-xs text-stone-500">Stable slug-like name used by the backend.</p>
            <FieldError error={errors.name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="label">Display label</Label>
            <Input
              id="label"
              name="label"
              placeholder="Web App"
              defaultValue={defaults?.label ?? ''}
            />
            <p className="text-xs text-stone-500">Human-readable label shown in the UI.</p>
            <FieldError error={errors.label} />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={processing}>
            {processing ? submittingLabel : submitLabel}
          </Button>
        </div>
      )}
    </Form>
  )
}
