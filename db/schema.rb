# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151130075200) do

  create_table "casserver_lt", force: :cascade do |t|
    t.string   "ticket",          limit: 255, null: false
    t.datetime "created_on",                  null: false
    t.datetime "consumed"
    t.string   "client_hostname", limit: 255, null: false
  end

  create_table "casserver_pgt", force: :cascade do |t|
    t.string   "ticket",            limit: 255, null: false
    t.datetime "created_on",                    null: false
    t.string   "client_hostname",   limit: 255, null: false
    t.string   "iou",               limit: 255, null: false
    t.integer  "service_ticket_id", limit: 4,   null: false
  end

  create_table "casserver_st", force: :cascade do |t|
    t.string   "ticket",            limit: 255,   null: false
    t.text     "service",           limit: 65535, null: false
    t.datetime "created_on",                      null: false
    t.datetime "consumed"
    t.string   "client_hostname",   limit: 255,   null: false
    t.string   "username",          limit: 255,   null: false
    t.string   "type",              limit: 255,   null: false
    t.integer  "granted_by_pgt_id", limit: 4
    t.integer  "granted_by_tgt_id", limit: 4
  end

  create_table "casserver_tgt", force: :cascade do |t|
    t.string   "ticket",           limit: 255,   null: false
    t.datetime "created_on",                     null: false
    t.string   "client_hostname",  limit: 255,   null: false
    t.string   "username",         limit: 255,   null: false
    t.text     "extra_attributes", limit: 65535
  end

  create_table "identities", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.string   "provider",   limit: 255
    t.string   "uid",        limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "identities", ["user_id"], name: "index_identities_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "name",                   limit: 255
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "identities", "users"
end
