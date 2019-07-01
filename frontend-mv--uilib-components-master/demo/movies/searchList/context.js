import {DomainBuilder} from '@s-ui/studio-utils'
import Domain from 'movieDomain'

export default {
  default: {
    domain: DomainBuilder.extend({domain: new Domain()}).build()
  }
}
