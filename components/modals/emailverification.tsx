import { EmailIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SponsorType } from '../../interface/sponsor';
import { createSponsor } from '../../utils/functions';
interface Props {
  onClose: () => void;
  isOpen: boolean;
  email: string;
  sponsor: SponsorType;
}
export const Emailverification = ({
  onClose,
  isOpen,
  email,
  sponsor,
}: Props) => {
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent py={10} h={'max'}>
        <ModalHeader>
          {success ? (
            ''
          ) : (
            <Text color={'gray.700'} fontWeight={600} fontFamily={'Inter'}>
              Please confirm your email
            </Text>
          )}
        </ModalHeader>
        {success ? '' : <ModalCloseButton />}
        {success ? (
          <ModalBody>
            <VStack>
              <Image src={'/assets/icons/green-tick.svg'} alt={'green tick'} />
              <Text
                fontFamily={'Inter'}
                textAlign={'center'}
                fontWeight={600}
                color={'gray.600'}
                pb={3}
              >
                Success
              </Text>
              <Button
                onClick={() => {
                  router.push('/dashboard/team');
                }}
                w={'full'}
                bg={'#6562FF'}
                color={'white'}
                mt={10}
              >
                Continue
              </Button>
            </VStack>
          </ModalBody>
        ) : (
          <ModalBody>
            <VStack gap={3}>
              <Flex
                w="100px"
                h="100px"
                borderRadius="100%"
                bg="gray.50"
                justify="center"
                align="center"
                mt={4}
              >
                <EmailIcon color={'gray.400'} w="24px" h="30px"></EmailIcon>
              </Flex>
              <Text
                fontFamily={'Inter'}
                textAlign={'center'}
                fontWeight={600}
                color={'gray.600'}
              >
                Enter the OTP sent on {email}
              </Text>
              <Box mt={3}>
                <PinInput type="alphanumeric" mask manageFocus>
                  <PinInputField mx={2} />
                  <PinInputField mx={2} />
                  <PinInputField mx={2} />
                  <PinInputField mx={2} />
                </PinInput>
              </Box>
              <Button
                onClick={async () => {
                  const a = await createSponsor(sponsor);
                  console.log(a);
                  if (a.data) {
                    setSuccess(true);
                  }
                }}
                w={'full'}
                bg={'#6562FF'}
                color={'white'}
                mt={10}
              >
                Verify
              </Button>
            </VStack>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};