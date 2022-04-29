import Vue from 'vue'
declare module 'vue/types/vue' {
  interface Vue {
    districtId: number
    checkPemission(
      module: string,
      roles: Array<
        | 'view'
        | 'edit'
        | 'remove'
        | 'cbx-action-edit-no-audit'
        | 'edit-matched-page'
        | 'all'
        | 'edit-no-audit'
        | 'edit-auditing'
        | 'edit-pending'
        | 'edit-filter-transaction-cbnv'
        | 'edit-filter-cbnv'
        | 'edit-approved'
        | 'edit-request'
        | 'edit-form'
        | 'cbx-action'
        | 'edit-filter-member-cbnv'
        | 'edit-input'
        | 'edit-filter'
        | 'edit-filter-member'
        | 'edit-filter-transaction'
        | 'view-menu'
        | 'edit-filter-transaction-dvkd'
        | 'edit-filter-dvkd'
        | 'edit-filter-member-dvkd'
        | 'cbx-action-da-duyet'
        | 'send-mail'
        | 'export-excel'
        | 'pay-fee-date'
        | 'change-consultant'
        | 'add-offer'
      >
    ): boolean
  }
}
