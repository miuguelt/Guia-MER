import type { SystemCaseStudy } from '../types'
import { ecommerceCase } from './ecommerceCase'
import { hospitalCase } from './hospitalCase'
import { academyCase } from './academyCase'
import { workshopCase } from './workshopCase'
import { cattleFarmCase } from './cattleFarmCase'

export { ecommerceCase, hospitalCase, academyCase, workshopCase, cattleFarmCase }

export const realWorldCaseStudies: SystemCaseStudy[] = [
  ecommerceCase,
  hospitalCase,
  academyCase,
  workshopCase,
  cattleFarmCase,
]
