import { Work_Sans } from 'next/font/google'
import localFont from 'next/font/local'

export const ivyPrestoTextSemiBold = localFont({ src: '../assets/fonts/ivy-presto-text-semi-bold.otf' }) 

export const ivyPrestoTextLight = localFont({src: '../assets/fonts/ivy-presto-text-light.otf'})

export const workSans = Work_Sans({ subsets: ['latin'] })