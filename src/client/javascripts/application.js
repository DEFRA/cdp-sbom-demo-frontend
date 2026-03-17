import {
  createAll,
  Button,
  Checkboxes,
  ErrorSummary,
  Header,
  Radios,
  SkipLink
} from 'govuk-frontend'
import { initClass, initModules } from '../common/helpers/init.js'
import { filters } from '../../server/common/components/filters/filters.js'
import { Autocomplete } from '../../server/common/components/autocomplete/autocomplete.js'
import { AutocompleteAdvanced } from '../../server/common/components/autocomplete/autocomplete-advanced.js'
import { AutocompleteSearch } from '../../server/common/components/autocomplete/autocomplete-search.js'
import searchDependencyName from '../common/helpers/fetch/autocomplete/searchDependencyName.js'

createAll(Button)
createAll(Checkboxes)
createAll(ErrorSummary)
createAll(Header)
createAll(Radios)
createAll(SkipLink)

// ClientSide CDP namespace
window.cdp = window.cdp || {}

window.cdp.searchDependencyName = searchDependencyName

// Filters
initModules('app-filters', filters)

// Autocomplete
initClass('app-autocomplete', Autocomplete)
initClass('app-autocomplete-advanced', AutocompleteAdvanced)
initClass('app-autocomplete-search', AutocompleteSearch)
