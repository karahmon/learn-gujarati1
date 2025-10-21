import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'


export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <Card className="border-0 sm:border">
        <CardHeader className="text-center px-4 sm:px-6">
          <CardTitle className="text-2xl sm:text-xl">Create your account</CardTitle>
          <CardDescription className="text-base sm:text-sm">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name" className="text-base sm:text-sm">Full Name</FieldLabel>
                <Input id="name" type="text" placeholder="Chandu Patel" required className="h-12 text-base" />
              </Field>

              <Field>
                <FieldLabel htmlFor="email" className="text-base sm:text-sm">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="h-12 text-base"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="contact" className="text-base sm:text-sm">Contact No</FieldLabel>
                <Input id="contact" type="tel" placeholder="+919876543210" pattern="[0-9+\- ]{7,}" className="h-12 text-base" />
              </Field>

              <Field>
                <FieldLabel htmlFor="mhtId" className="text-base sm:text-sm">MHT ID</FieldLabel>
                <Input id="mhtId" type="text" placeholder="MHT123456" className="h-12 text-base" />
              </Field>

              <Field>
                <FieldLabel htmlFor="subCenter" className="text-base sm:text-sm">Sub Center</FieldLabel>
                <Input id="subCenter" type="text" placeholder="Ahmedabad - North" className="h-12 text-base" />
              </Field>

              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password" className="text-base sm:text-sm">Password</FieldLabel>
                    <Input id="password" type="password" required minLength={8} className="h-12 text-base" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password" className="text-base sm:text-sm">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required minLength={8} className="h-12 text-base" />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              <Field>
                <Button type="submit" variant={"outline"} className="w-full h-12 text-base font-medium">Create Account</Button>
                <FieldDescription className="text-center text-base sm:text-sm">
                  Already have an account? <Link to="/">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
