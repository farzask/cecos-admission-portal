## Table `applications`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `cycle_id` | `uuid` |  |
| `phase_id` | `uuid` |  |
| `student_id` | `uuid` |  |
| `status` | `application_status` |  |
| `admission_id` | `text` |  Nullable Unique |
| `unlocked_until` | `timestamptz` |  Nullable |
| `unlocked_by` | `uuid` |  Nullable |
| `level` | `cycle_level` |  |
| `qualification_group` | `qualification_group` |  |
| `program_choices` | `_uuid` |  |
| `full_name` | `text` |  |
| `date_of_birth` | `date` |  Nullable |
| `gender` | `varchar` |  Nullable |
| `marital_status` | `varchar` |  Nullable |
| `nationality` | `varchar` |  Nullable |
| `domicile_district` | `text` |  Nullable |
| `country` | `text` |  Nullable |
| `current_address` | `text` |  |
| `permanent_address` | `text` |  |
| `father_name` | `text` |  Nullable |
| `father_cnic` | `varchar` |  Nullable |
| `mother_name` | `text` |  Nullable |
| `parent_contact` | `varchar` |  Nullable |
| `parent_whatsapp` | `varchar` |  Nullable |
| `parent_info_filled` | `bool` |  |
| `ssc_obtained` | `int4` |  Nullable |
| `ssc_total` | `int4` |  Nullable |
| `ssc_board` | `text` |  Nullable |
| `fsc_obtained` | `int4` |  Nullable |
| `fsc_total` | `int4` |  Nullable |
| `fsc_board` | `text` |  Nullable |
| `fsc_result_awaited` | `bool` |  |
| `fsc_part1_obtained` | `int4` |  Nullable |
| `fsc_part1_total` | `int4` |  Nullable |
| `etea_taken` | `bool` |  |
| `etea_roll_number` | `text` |  Nullable |
| `bachelor_degree` | `text` |  Nullable |
| `bachelor_university` | `text` |  Nullable |
| `bachelor_cgpa` | `numeric` |  Nullable |
| `bachelor_cgpa_scale` | `numeric` |  Nullable |
| `gat_hat_score` | `int4` |  Nullable |
| `work_experience_years` | `int4` |  Nullable |
| `is_wwb` | `bool` |  |
| `wwb_eobi_card` | `text` |  Nullable |
| `wwb_essi_card` | `text` |  Nullable |
| `wwb_parent_designation` | `text` |  Nullable |
| `wwb_industrial_unit` | `text` |  Nullable |
| `wwb_father_name` | `text` |  Nullable |
| `wwb_father_cnic` | `varchar` |  Nullable |
| `wwb_postal_address` | `text` |  Nullable |
| `wwb_email` | `text` |  Nullable |
| `wwb_contact` | `varchar` |  Nullable |
| `passport_number` | `text` |  Nullable |
| `is_re_applicant` | `bool` |  |
| `submitted_at` | `timestamptz` |  Nullable |
| `paid_at` | `timestamptz` |  Nullable |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |
| `ssc_year` | `int4` |  Nullable |
| `fsc_year` | `int4` |  Nullable |
| `fsc_year_expected` | `int4` |  Nullable |
| `etea_score` | `int4` |  Nullable |
| `qualification_group_note` | `jsonb` |  Nullable |
| `version` | `int4` |  |
| `nationality_change_count` | `int4` |  |

## Table `audit_log`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `timestamp` | `timestamptz` |  |
| `actor_id` | `uuid` |  Nullable |
| `actor_role` | `text` |  Nullable |
| `actor_name` | `text` |  Nullable |
| `action` | `text` |  |
| `entity_type` | `text` |  Nullable |
| `entity_id` | `text` |  Nullable |
| `field_name` | `text` |  Nullable |
| `old_value` | `jsonb` |  Nullable |
| `new_value` | `jsonb` |  Nullable |
| `ip_address` | `inet` |  Nullable |
| `user_agent` | `text` |  Nullable |
| `context` | `jsonb` |  Nullable |

## Table `audit_log_archive`

Audit rows older than 12 months. Move job runs nightly. Append-only.

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `timestamp` | `timestamptz` |  |
| `actor_id` | `uuid` |  Nullable |
| `actor_role` | `text` |  Nullable |
| `actor_name` | `text` |  Nullable |
| `action` | `text` |  |
| `entity_type` | `text` |  Nullable |
| `entity_id` | `text` |  Nullable |
| `field_name` | `text` |  Nullable |
| `old_value` | `jsonb` |  Nullable |
| `new_value` | `jsonb` |  Nullable |
| `ip_address` | `inet` |  Nullable |
| `user_agent` | `text` |  Nullable |
| `context` | `jsonb` |  Nullable |

## Table `auth_audit_log`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `event` | `text` |  |
| `user_id` | `uuid` |  Nullable |
| `ip` | `text` |  Nullable |
| `user_agent` | `text` |  Nullable |
| `metadata` | `jsonb` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `broadcasts`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `cycle_id` | `uuid` |  Nullable |
| `template_name` | `text` |  |
| `subject` | `text` |  |
| `body` | `text` |  |
| `audience_filter` | `jsonb` |  |
| `audience_count` | `int4` |  |
| `channels` | `_notification_channel` |  |
| `sent_by` | `uuid` |  |
| `sent_at` | `timestamptz` |  |

## Table `cash_shifts`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `collector_id` | `uuid` |  |
| `date` | `date` |  |
| `shift_started_at` | `timestamptz` |  |
| `shift_ended_at` | `timestamptz` |  Nullable |
| `claimed_amount` | `int4` |  Nullable |
| `confirmed_amount` | `int4` |  Nullable |
| `confirmed_by` | `uuid` |  Nullable |
| `confirmed_at` | `timestamptz` |  Nullable |
| `discrepancy_note` | `text` |  Nullable |
| `transaction_count` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `cycles`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `session` | `session_type` |  |
| `year` | `int4` |  |
| `level` | `cycle_level` |  |
| `status` | `cycle_status` |  |
| `start_date` | `date` |  |
| `end_date` | `date` |  |
| `closed_at` | `timestamptz` |  Nullable |
| `archived_at` | `timestamptz` |  Nullable |
| `created_by` | `uuid` |  |
| `enabled_sections` | `jsonb` |  |
| `program_choices_count` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |
| `config` | `jsonb` |  |

## Table `disciplines`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `group_number` | `int4` |  |
| `name` | `text` |  |
| `short_code` | `text` |  Unique |
| `level` | `cycle_level` |  |
| `active` | `bool` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `documents`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `application_id` | `uuid` |  |
| `document_type` | `document_type` |  |
| `imagekit_file_id` | `text` |  |
| `imagekit_url` | `text` |  |
| `file_size_bytes` | `int4` |  |
| `mime_type` | `text` |  |
| `photo_check_status` | `photo_check_status` |  |
| `photo_check_confidence` | `int4` |  Nullable |
| `photo_check_issues` | `jsonb` |  Nullable |
| `photo_check_at` | `timestamptz` |  Nullable |
| `uploaded_by` | `uuid` |  Nullable |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `eligibility_rules`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `cycle_id` | `uuid` |  |
| `discipline_id` | `uuid` |  |
| `qualification_group` | `qualification_group` |  |
| `min_percentage` | `numeric` |  |
| `active` | `bool` |  |
| `grade_mapping` | `jsonb` |  Nullable |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `notifications`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `recipient_id` | `uuid` |  Nullable |
| `recipient_email` | `text` |  Nullable |
| `recipient_phone` | `text` |  Nullable |
| `channel` | `notification_channel` |  |
| `template_name` | `text` |  |
| `subject` | `text` |  Nullable |
| `body_preview` | `text` |  Nullable |
| `status` | `notification_status` |  |
| `ses_message_id` | `text` |  Nullable |
| `ycloud_message_id` | `text` |  Nullable |
| `error` | `text` |  Nullable |
| `sent_at` | `timestamptz` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `otp_verifications`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `identifier` | `text` |  |
| `otp_hash` | `text` |  |
| `channel` | `otp_channel` |  |
| `expires_at` | `timestamptz` |  |
| `attempt_count` | `int4` |  |
| `verified_at` | `timestamptz` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `payments`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `application_id` | `uuid` |  |
| `amount` | `int4` |  |
| `status` | `payment_status` |  |
| `method` | `payment_method` |  Nullable |
| `paypro_order_number` | `text` |  Nullable Unique |
| `paypro_consumer_id` | `text` |  Nullable |
| `paypro_pay_proid` | `text` |  Nullable |
| `paypro_click_to_pay_url` | `text` |  Nullable |
| `collected_by` | `uuid` |  Nullable |
| `receipt_number` | `text` |  Nullable Unique |
| `paid_at` | `timestamptz` |  Nullable |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `paypro_stub_orders`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `order_number` | `text` | Primary |
| `application_id` | `uuid` |  |
| `amount` | `int4` |  |
| `consumer_id` | `text` |  |
| `click_to_pay_url` | `text` |  |
| `webhook_secret` | `text` |  |
| `status` | `text` |  |
| `created_at` | `timestamptz` |  |
| `expires_at` | `timestamptz` |  |
| `manual_outcome` | `text` |  Nullable |
| `manual_outcome_at` | `timestamptz` |  Nullable |

## Table `pending_email_signups`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `email` | `text` |  |
| `password_ciphertext` | `text` |  |
| `otp_hash` | `text` |  |
| `otp_expires_at` | `timestamptz` |  |
| `otp_attempts` | `int4` |  |
| `otp_dispatch_count` | `int4` |  |
| `last_dispatched_at` | `timestamptz` |  |
| `created_at` | `timestamptz` |  |

## Table `pending_signups`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `phone_e164` | `text` |  |
| `password_ciphertext` | `text` |  |
| `otp_hash` | `text` |  |
| `otp_expires_at` | `timestamptz` |  |
| `otp_attempts` | `int4` |  |
| `otp_dispatch_count` | `int4` |  |
| `last_dispatched_at` | `timestamptz` |  |
| `created_at` | `timestamptz` |  |

## Table `phases`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `cycle_id` | `uuid` |  |
| `phase_number` | `int4` |  |
| `start_date` | `date` |  |
| `end_date` | `date` |  |
| `fee_amount` | `int4` |  |
| `eligibility` | `phase_eligibility` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `phone_otp_attempts`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `purpose` | `text` |  |
| `user_id` | `uuid` |  Nullable |
| `phone_e164` | `text` |  |
| `otp_hash` | `text` |  |
| `otp_expires_at` | `timestamptz` |  |
| `otp_attempts` | `int4` |  |
| `verified_at` | `timestamptz` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `profiles`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `role` | `user_role` |  |
| `identity_type` | `identity_type` |  Nullable |
| `cnic` | `varchar` |  Nullable Unique |
| `passport_number` | `text` |  Nullable |
| `passport_country` | `text` |  Nullable |
| `phone_e164` | `text` |  Nullable Unique |
| `whatsapp_number` | `text` |  Nullable |
| `phone_verified_at` | `timestamptz` |  Nullable |
| `email_verified_at` | `timestamptz` |  Nullable |
| `verification_status` | `verification_status` |  |
| `phone_verified` | `bool` |  |
| `email_verified` | `bool` |  |
| `otp_channel_used` | `otp_channel` |  Nullable |
| `full_name` | `text` |  Nullable |
| `auth_provider` | `auth_provider` |  |
| `locale` | `varchar` |  |
| `tour_completed` | `bool` |  |
| `staff_employee_id` | `text` |  Nullable |
| `staff_department` | `text` |  Nullable |
| `staff_active` | `bool` |  |
| `requires_password_change` | `bool` |  |
| `is_foreign` | `bool` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |
| `session_revocation_at` | `timestamptz` |  Nullable |
| `avatar_url` | `text` |  Nullable |
| `pin_hash` | `text` |  Nullable |
| `pin_set_at` | `timestamptz` |  Nullable |
| `pin_failed_attempts` | `int4` |  |
| `pin_failed_window_start` | `timestamptz` |  Nullable |
| `pin_locked_until` | `timestamptz` |  Nullable |
| `last_pin_auth_at` | `timestamptz` |  Nullable |

## Table `queue_tokens`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `token_number` | `int4` |  |
| `date` | `date` |  |
| `queue_type` | `queue_type` |  |
| `status` | `queue_status` |  |
| `position` | `int4` |  |
| `called_at` | `timestamptz` |  Nullable |
| `counter_number` | `int4` |  Nullable |
| `helper_id` | `uuid` |  Nullable |
| `done_at` | `timestamptz` |  Nullable |
| `done_with_application_id` | `uuid` |  Nullable |
| `skip_reason` | `text` |  Nullable |
| `associated_cnic` | `varchar` |  Nullable |
| `associated_email` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |
| `skip_count` | `int4` |  |

## Table `rate_limits`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `key` | `text` | Primary |
| `count` | `int4` |  |
| `window_start` | `timestamptz` |  |
| `expires_at` | `timestamptz` |  |

## Table `staff_allowlist`

Authoritative list of staff emails allowed to sign in. One row per staff member.

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `email` | `text` |  Unique |
| `full_name` | `text` |  |
| `role` | `user_role` |  |
| `active` | `bool` |  |
| `added_by` | `uuid` |  Nullable |
| `added_at` | `timestamptz` |  |
| `removed_at` | `timestamptz` |  Nullable |
| `notes` | `text` |  Nullable |

