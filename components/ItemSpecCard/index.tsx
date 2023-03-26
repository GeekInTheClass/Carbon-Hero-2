import {  Text, Image, Badge, Button, Card, Stack, CardBody, CardFooter, Heading,Container,Center } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { ItemDataInterface } from '../../data/items.interface';
import { useToast, useDisclosure} from '@chakra-ui/react'
import {useEffect, useRef, useState} from "react";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from '@chakra-ui/react'
  
interface itemsSpec {
    property: any;
    select: (arg1?: any, arg2?: any) => any;
    selected: Number[];
};

const ItemSpecCard = ({property, select, selected}:itemsSpec) => {
    console.log("ItemSpecCard", property.img)
    const toast = useToast()
    console.log("ItemSpecCard", selected, property.tier)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null)

    const myClick=()=>{
        onClose();
        select(0, property.tier);
    }
   
    return (

        <Card minH='100%' direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
            {
            Object.keys(property).length === 0 
            ?
            <>
            <Stack>
                <CardBody alignItems='center'>
                    <Heading alignSelf='center' size='ml' textColor='gray.400'>Select an item</Heading>
                </CardBody>
            </Stack>
            </>
            :<>
            <Image 
                objectFit='cover'
                maxW={{ base: '100%', sm: '20%'}}
                src={property.img}
                alt='Recycling Trash'/>
            <Stack>
                <CardBody>
                    <Badge colorScheme='teal' fontSize='md'>
                        {Array(4).fill('').map((_, i) => (
                            <StarIcon
                                key={i}
                                color={i < property.tier ? 'teal.500' : 'gray.300'}
                            />
                        ))}
                    </Badge>
                    <Badge colorScheme='red' fontSize='md' ml='1%' borderRadius='full' > Retention For {1} Year </Badge>
                    <Heading paddingTop='1%' size='md'> {property.name} </Heading>
                    <Text fontSize='lg' py='1%'> {property.story} </Text>
                </CardBody>
                <CardFooter>
                    {   property.tier > (Number(selected[0])-1) ?
                        <>
                        <Button variant='solid' colorScheme='blue' onClick={onOpen}> Select</Button>
                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                        > 
                            <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Select Item
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                {`Are you sure? You can't undo this action afterwards.`}
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='green' onClick={myClick} ml={3}>
                                    Select
                                </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                        </>
                        :<Button variant='solid' colorScheme='gray'
                            onClick={() =>
                                toast({
                                title: 'Already selected.',
                                description: "The item is used.",
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                                })
                            }> Select</Button>
                    }   
                </CardFooter>
            </Stack>
            </>
            }
        </Card>  
    )
}

export default ItemSpecCard

