import {
    Box,
    Spinner,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from "react"
import { StatusContext, IContextStatus } from '../Context/StatusContext';


const steps = [
    { title: 'Clonado', description: 'Código baixado' },
    { title: 'Compilado', description: 'Código compilado' },
    { title: 'Publicado', description: 'Dependências criadas' },
    { title: 'Ativo', description: 'Site no ar' },
]

interface StepperBarProps {
    id: number;
}

export const StepperBar = ({ id }: StepperBarProps) => {
    const { contextStatus } = useContext(StatusContext);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const status = contextStatus.find((c: IContextStatus) => c.id === id)?.status || 0;
        setActiveStep(status);
    }, [contextStatus, id]);


    return (
        <Stepper size='md' index={activeStep}>
            {steps.map((step, index) => (
                <Step key={index}>
                    <StepIndicator borderColor={index === activeStep ? 'transparent!important' : ''}>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<Spinner
                                speed='2s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='md'
                            />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    )
}