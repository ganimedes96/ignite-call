import { Button, TextInput, Text } from '@ignite-ui/react'
import { Form, FormAnnotation } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário deve ter pelo menos 3 caracteres' })
    .regex(/^([a-z\\\\-]+)$/i, {
      message: 'O usuário só pode conter letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
})
type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })
  const router = useRouter()
  const handleClaimUsername = async (data: ClaimUsernameFormData) => {
    const { username } = data
    router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          placeholder="Seu usuário"
          prefix="ignite.com/"
          {...register('username')}
        />
        <Button size={'sm'} type="submit">
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite seu nome de usuário'}
        </Text>
      </FormAnnotation>
    </>
  )
}
